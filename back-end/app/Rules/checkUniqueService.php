<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CheckUniqueService implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($shop_id, $id, $service)
    {
        $this->shop_id = $shop_id;
        $this->id = $id;
        $this->service = $service;
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
        if ($this->id) {
            return $this->service->checkServiceNameIgnoreExist($value, $this->id, $this->shop_id);
        }
        return $this->service->checkServiceNameExist($value, $this->shop_id);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This service name  exist';
    }
}

