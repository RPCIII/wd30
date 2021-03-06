<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'mls_id',
        'address',
        'company',
        'password',
        'cell_phone',
        'fb_page_id',
        'is_realtor',
        'avatar_path',
        'office_phone',
        'primary_phone',
        'default_photo',
        'twitter_handle',
        'fb_access_token',
        'instagram_handle',
        'youtube_channel_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     *
     * @param string $query
     * @return
     */
    public function scopeRealtor($query)
    {
        return $query->where('is_realtor', true)->with('mls_numbers')->first();
    }

    public function mls_numbers()
    {
        return $this->hasMany(MlsNumber::class);
    }
}
