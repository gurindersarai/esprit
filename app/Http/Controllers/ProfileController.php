<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\UserImage;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'photos' => $request->user()->images()->orderBy('position')->get(),
            'interests'=> $request->user()->interests,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function updateImages(Request $request): RedirectResponse
    {
        // dd($request->only('photos')['photos']);
        if(isset($request->only('photos')['photos'])) foreach($request->only('photos')['photos'] as $k => $photo){
            if(!isset($photo['status']) || ($photo['status'] == 'existing')){
                UserImage::where('id',$photo['id'])->update(['position'=>$k]);
            }elseif($photo['status'] == 'new'){
                $path =Storage::disk('public')->putFile('profile_images', new File($photo['file']));
                UserImage::create(['user_id'=>$request->user()->id,'image'=>$path,'position'=>$k]);
            }
        }
        if(isset($request->only('deletedPhotos')['deletedPhotos']))  foreach($request->only('deletedPhotos')['deletedPhotos'] as $k => $photo){
            if(is_file($photo)){
            Storage::delete($photo['file']);
              }
                UserImage::where('id',$photo['id'])->delete();
        }
        // $request->user()->fill($request->validated());
        // if($request->file('profile_image')) {
        // $profile_image =  $request->file('profile_image')->store('profile_images',['disk' => 'public']);
        // $request->user()->profile_image = $profile_image;
        // // $profile_image = $profile_image.' -- '.$request->file('profile_image')->hashName();
        // // dd($profile_image);
        // }    
        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }
        // $request->user()->save();

        return Redirect::route('profile.edit');
    }
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        if($request->file('profile_image')) {
        $profile_image =  $request->file('profile_image')->store('profile_images',['disk' => 'public']);
        $request->user()->profile_image = $profile_image;
        // $profile_image = $profile_image.' -- '.$request->file('profile_image')->hashName();
        // dd($profile_image);
        }    
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
