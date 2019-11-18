<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CheckUniqueRental implements Rule
{
    protected $rental;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($shopId, $rentalId, $rentalModel)
    {
        $this->rental = $rentalModel;
        $this->shopId = $shopId;
        $this->rentalId = $rentalId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!$this->rentalId) {
            return $this->rental->checkRentalNameIsExist($value, $this->shopId);
        }

        return $this->rental->checkRentalNameIsExistIgnore($value, $this->shopId, $this->rentalId);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('Rental name is exist.');
    }
}

