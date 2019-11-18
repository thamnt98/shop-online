<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordStaff;
use App\Http\Requests\StaffRequest;
use App\Http\Resources\Staff\StaffResource;
use App\Http\Resources\Staff\StaffsResource;
use App\Staff;
use App\ZipCode;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StaffController extends Controller
{
    protected $staffModel;

    public function __construct(Staff $staffModel)
    {
        $this->staff = $staffModel;
    }

    /**
     * Get data for staff
     *
     * @param  Illuminate\Http\Request
     * @return  App\Http\Resources\Staff\StaffResource collection
     */
    public function index(Request $request)
    {
        $perPage = $request->per_page;

        $result = $this->staff->getStaffs($perPage);
        return StaffsResource::collection($result);
    }

    /**
     * Get a staff
     *
     * @param  id staff
     * @return  App\Http\Resources\Staff\StaffResource;
     */
    public function show($id)
    {
        $result = $this->staff->getStaff($id);

        if (!$result) {
            return response(null, Response::HTTP_BAD_REQUEST);
        }

        return new StaffResource($result);
    }

    /**
     * Create a staff
     *
     * @param  App\Http\Requests\StaffRequest
     * @return  App\Http\Resources\Staff\StaffResource;
     */
    public function store(StaffRequest $request)
    {
        try {
            $result = $this->staff->createStaff($request);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return (new StaffResource($result))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Update staff
     *
     * @param  App\Http\Requests\StaffRequest
     * @return  Illuminate\Http\Response
     */
    public function update(StaffRequest $request, $id)
    {
        $result = $this->staff->getStaff($id);

        if (!$result) {
            return response(null, Response::HTTP_NO_CONTENT);
        }

        try {
            $this->staff->updateStaff($id, $request);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response(null, Response::HTTP_OK);
    }

    /**
     * Delete a staff
     *
     * @param  id of staff
     * @return  Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $staff = $this->staff->getStaff($id);

        if (!$staff) {
            return response(null, 400);
        }

        $this->staff->softDeleteStaff($id);

        return response(null, Response::HTTP_OK);
    }

    /**
     * Change password
     *
     * @param  App\Http\Requests\ChangePasswordStaff
     * @return  Illuminate\Http\Response
     */
    public function changePassword(ChangePasswordStaff $request)
    {
        $staff = $this->staff->getStaff($request->id);

        if (!$staff) {
            return response(null, 400);
        }

        try {
            $this->staff->changePasswordStaff($request->id, $request->password);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

