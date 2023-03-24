<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
{   
    $messageWithUsers = Message::where('from_user',auth()->id())->orWhere('to_user',auth()->id())->pluck('to_user'); 
    $messageWithUsers = User::find($messageWithUsers);
    // dd($messageWithUsers);
      return Inertia::render('Messages/Index', [
        'users' => $messageWithUsers,
        'status' => session('status'),
    ]);
}

/**
 * Fetch all messages
 *
 * @return Message
 */
public function getMessagesQuery($id){
   return Message::where(function ($query) use ($id) {
        $query->where('from_user','=',auth()->id())
            ->where('to_user','=',$id);
    })->orWhere(function ($query) use ($id) {
        $query->where('to_user','=',auth()->id())
            ->where('from_user','=',$id);
    });
}
public function show($id)
{ 
    $getMessages = $this->getMessagesQuery($id)->get();
    return Inertia::render('Messages/View', [
        'messages' => $getMessages,
        'to_user'=> User::find($id),
        'status' => session('status'),
    ]);
}

/**
 * Persist message to database
 *
 * @param  Request $request
 * @return Response
 */
public function store($id,Request $request)
{
  $user = Auth::user();
//   dd($request->input('message'));
  $message = Message::create([
    'content' => $request->input('message'),
    'from_user' => $user->id,
    'to_user' => $id,
  ]);

  broadcast(new MessageSent($user, $message))->toOthers();

//   return to_route('messages');
}
    public function getLoadLatestMessages(Request $request)
    {
        if(!$request->user_id) {
            return;
        }
        $messages = Message::where(function($query) use ($request) {
            $query->where('from_user', Auth::user()->id)->where('to_user', $request->user_id);
        })->orWhere(function ($query) use ($request) {
            $query->where('from_user', $request->user_id)->where('to_user', Auth::user()->id);
        })->orderBy('created_at', 'ASC')->limit(10)->get();
        $return = [];
        foreach ($messages as $message) {
            $return[] = view('message-line')->with('message', $message)->render();
        }
        return response()->json(['state' => 1, 'messages' => $return]);
    }

    public function postSendMessage(Request $request)
    {
        if(!$request->to_user || !$request->message) {
            return;
        }
        $message = new Message();
        $message->from_user = Auth::user()->id;
        $message->to_user = $request->to_user;
        $message->content = $request->message;
        $message->save();
        // prepare some data to send with the response
        $message->dateTimeStr = date("Y-m-dTH:i", strtotime($message->created_at->toDateTimeString()));
        $message->dateHumanReadable = $message->created_at->diffForHumans();
        $message->fromUserName = $message->fromUser->name;
        $message->from_user_id = Auth::user()->id;
        $message->toUserName = $message->toUser->name;
        $message->to_user_id = $request->to_user;
        // PusherFactory::make()->trigger('chat', 'send', ['data' => $message]);
        return response()->json(['state' => 1, 'data' => $message]);
    }
    public function getOldMessages(Request $request)
    {
        if(!$request->old_message_id || !$request->to_user)
            return;
        $message = Message::find($request->old_message_id);
        $lastMessages = Message::where(function($query) use ($request, $message) {
            $query->where('from_user', Auth::user()->id)
                ->where('to_user', $request->to_user)
                ->where('created_at', '<', $message->created_at);
        })
            ->orWhere(function ($query) use ($request, $message) {
            $query->where('from_user', $request->to_user)
                ->where('to_user', Auth::user()->id)
                ->where('created_at', '<', $message->created_at);
        })
            ->orderBy('created_at', 'ASC')->limit(10)->get();
        $return = [];
        if($lastMessages->count() > 0) {
            foreach ($lastMessages as $message) {
                $return[] = view('message-line')->with('message', $message)->render();
            }
            // PusherFactory::make()->trigger('chat', 'oldMsgs', ['to_user' => $request->to_user, 'data' => $return]);
        }
        return response()->json(['state' => 1, 'data' => $return]);
    }
}
