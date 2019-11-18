<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Admin extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'admin';
    protected $primaryKey = 'id';

    protected $fillable = [
        'username',
        'password',
    ];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Change column username
     *
     * @param $username
     * @return Admin
     */
    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }

    /**
     * Check md5 password
     *
     * @param $password
     * @return bool
     */
    public function validateForPassportPasswordGrant($password)
    {
        return md5($password) == $this->password;
    }

    /**
     * Get Client
     *
     * @return mixed
     */
    public function getPasswordClient()
    {
        return Client::where('password_client', 1)->first();
    }

    /**
     * Get info User
     *
     * @return mixed
     */
    public function getInfoUser($id_access)
    {
        $id = $this->getInfoByToken($id_access);
        return Admin::find($id);
    }

    /**
     * Update feild last login time
     *
     * @return mixed
     */
    public function updateLastLoginTime($request)
    {
       return Admin::where('username', $request->username)
            ->update(['last_login_time' => Session::get('last_login_time')]);
    }

    /**
     * Get id user by token
     *
     * @return mixed
     */
    public function getInfoByToken($id_access)
    {
        $user_id = DB::table('oauth_access_tokens')
                    ->where('id', $id_access)
                    ->get('user_id');

        return $user_id[0]->user_id;
    }

    /**
     * Update revoked with $id
     *
     * @param $id
     * @return int|void
     */
    public function revokeToken($id)
    {
        if (!$id) {
            return;
        }

        return DB::table('oauth_access_tokens')
            ->where('id', $id)
            ->update([
                'revoked' => true
            ]);
    }

    /**
     * Update revoked distinct with $id
     *
     * @param $id
     * @return int|void
     */
    public function distinctRevokeToken($id)
    {
        if (!$id) {
            return;
        }

        return DB::table('oauth_access_tokens')
            ->where('id','!=', $id)
            ->update([
                'revoked' => true
            ]);
    }

     /**
     *  Find the id of user and update password
     *
     * @param Request $request, $id
     * @return bool
     */
    public function changePassword( $request, $id )
    {
        $id_access = $this->getInfoByToken($id);

        $findId = DB::table('admin')
        ->where('id',$id_access )
        ->where('password', '=', md5($request->currentPassword))
        ->first();
        
        if($findId){
            $update = DB::table('admin')
            ->where('id', $id_access)
            ->update([
                'password' => md5($request->newPassword)
            ]);

            return $update;
        }
    }
}
