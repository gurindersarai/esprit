<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserImage extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'image',
        'position',
    ];
    public function user():HasOne
    {
        return $this->hasOne(User::class);
    }
}
