<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsOnError;

class UsersImport implements ToModel, WithHeadingRow, SkipsOnError
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $name = $row['name'];
        $email = $row['email'];
        $qrCode = $row['qr_code'];
        $phoneNumber = $row['phone'];

        if($name && $email) {
            return new User([
                'name' => $name,
                'email' => $email,
                'qrcode' => $qrCode,
                'phone' => $phoneNumber
            ]);   
        }
    }

    /**
     * @param \Throwable $e
     */
    public function onError(\Throwable $e)
    {
        info($e->getMessage());
    }
}
