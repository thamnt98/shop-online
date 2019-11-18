<?php

namespace App\Http\Controllers\Api;

use Lcobucci\JWT\Parser;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Admin;
use App\Http\Resources\AdminResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    protected $admin;

    /**
     * AdminController constructor.
     *
     * @param Admin $admin
     */
    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    /**
     * Create access token
     *
     * @param Request $request
     * @return mixed
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|alpha|min:5|max:20',
            'password' => 'required|regex:/(^([a-zA-z0-9]))/u|min:5|max:20',
        ]);

        $client = $this->admin->getPasswordClient();

        $request->request->add([
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $request->username,
            'password' => $request->password,
            'scope' => '*'
        ]);

        $tokenRequest = Request::create(
            'oauth/token',
            'POST'
        );
        if($tokenRequest){
            $last_login=Carbon::now();
            Session::put('last_login_time',$last_login);
            $this->admin->updateLastLoginTime($request);
        }
        return Route::dispatch($tokenRequest)->header('Content-Type', 'application/json');
    }

    /**
     * Get infomation user
     *
     * @param Request $request
     * @return Json
     */
    public function getUserById(Request $request)
    {
        $id_access = $this->findIdOauthAccessTokens($request);
        $infoUser = $this->admin->getInfoUser($id_access);
        $admin = new AdminResource($infoUser);
        if($admin){
            return response()->json($admin);
        }
        return response()->json(["message" => "No content"], 204);
    }

    /**
     * Revoked access token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $id = $this->findIdOauthAccessTokens($request);

        if ($this->admin->revokeToken($id)) {
            return response()->json(["message" => "Logout success"]);
        }

        return response()->json(["message" => "Logout failed"], 400);
    }

    /**
     * Revoked access token distinct
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function distinctLogout(Request $request)
    {
        $id = $this->findIdOauthAccessTokens($request);

        if ($this->admin->distinctRevokeToken($id)) {
            return response()->json(["message" => "Logout success"]);
        }

        return response()->json(["message" => "Logout failed"], 400);
    }

    /**
     *  Find the id of oauth_access_tokens's table id with Bearer token
     *
     * @param Request $request
     * @return string id table oauth_access_tokens
     */
    public function findIdOauthAccessTokens(Request $request)
    {
        $value = $request->bearerToken();
        return (string)(new Parser())->parse($value)->getHeader('jti');
    }

     /**
     *  Change Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'currentPassword' => 'required|regex:/(^([a-zA-z0-9]))/u|min:5|max:20',
            'newPassword' => 'required|regex:/(^([a-zA-z0-9]))/u|min:5|max:20',
            'confirmPassword' => 'required|same:newPassword|regex:/(^([a-zA-z0-9]))/u|min:5|max:20',
        ]);
        $id = $this->findIdOauthAccessTokens($request);
        if($this->admin->changePassword( $request,$id )){
            $this->distinctLogout($request);
            return response()->json(["message"=>"Change password success!"]);
        }
        return response()->json(["message" => "Old password is incorrect!"],400);
    }
}
