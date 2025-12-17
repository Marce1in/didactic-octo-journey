<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(Request $request, Chat $chat)
    {
        abort_unless(
            $chat->users->contains(Auth::id()),
            403
        );

        $request->validate([
            'body' => 'required|string',
        ]);

        return $chat->messages()->create([
            'user_id' => Auth::id(),
            'body' => $request->body,
        ]);
    }
}
