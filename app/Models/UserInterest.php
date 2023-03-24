<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInterest extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','interest_id','position'];
    public function interest()
    {
        return $this->belongsTo(Interest::class);
    }

        public function user()
        {
            return $this->belongsTo(User::class);
        }
}
