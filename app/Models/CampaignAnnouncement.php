<?php

namespace App\Models;

use App\CampaignStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CampaignAnnouncement extends Model
{
    protected $fillable = [
        'name',
        'product_id',
        'company_id',
        'budget',
        'agency_cut',
        'category_id',
    ];

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(User::class, 'company_id');
    }
}
