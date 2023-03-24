<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Interest;
use App\Models\User;
use App\Models\UserImage;
use App\Models\UserInterest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class InterestController extends Controller
{
     public function index(Request $request)
    {
        // print_r(UserInterest::find(1)->with('')); die();
        // ddd($user->interests());
        return Inertia::render('Auth/Interests',[
            'interests'=> $request->user()->interests
        ]);
    }
    public function store(Request $request)
    {
        $interest = $request->validate([
            'name' => 'required|string|min:2|max:255',
        ]);
        // Validator::make();
        $getInterest = Interest::where('name',$interest['name'])->first();
        // dd($getInterest);
        $position = UserInterest::count() + 1;
        if($getInterest){
            $getUserInterest = UserInterest::where(['user_id'=>$request->user()->id,'interest_id'=>$getInterest->id])->first();
            if(!$getUserInterest){
            $user_interest = UserInterest::create(['user_id'=>$request->user()->id,'interest_id'=>$getInterest->id,'position'=>$position]);
            }else{
            throw \Illuminate\Validation\ValidationException::withMessages(['name' => 'Interest Already Exists']);
            }
            // dd($getInterest->id);
        }else{
            $interest = Interest::create($interest);
            $user_interest = UserInterest::create(['user_id'=>$request->user()->id,'interest_id'=>$interest->id,'position'=>$position]);
        }
       
        // return inertia('Profile/Edit', [
        //     'success' => $user_interest->id ? true : false,
        //     'interests'=> $request->user()->interests
        // ]);
        return to_route('profile.edit');
    }
    public function update(Request $request)
    {
        dd($request->only('interests'));
        if(isset($request->only('interests')['interests'])) foreach($request->only('interests')['interests'] as $k => $interest){
            if(!isset($interest['status']) || ($interest['status'] == 'existing')){
                $user_interest = UserInterest::where('id',$interest['id'])->update(['position'=>$k]);
            }
        }

        return to_route('profile.edit');
    }
    public function destroy(Request $request)
    {
        // dd($request->only(['interest_id']));
       $deleteInterest =  UserInterest::where('id', $request->input('interest_id'))->delete();
       return to_route('profile.edit');
    }
    public function home(Request $request)
    {

        $data = [
            // 'aa' => Auth::user(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ];
        if(auth()->user()){
            $user_interests = $request->user()->interests;
            $usersByInterestArr=[];
            foreach($user_interests as $k => $ui){
                $usersByInterest = UserInterest::where('interest_id',$ui->interest_id)->where('user_id','!=' , $request->user()->id)->get();
              
                if(!empty($usersByInterest)){
                    foreach($usersByInterest as $uk => $ubi){
                        $usersByInterestArr[$ubi->user_id]['user'] = User::find($ubi->user_id)->only(['name','id']);
                        $usersByInterestArr[$ubi->user_id]['user']['images'] = User::find($ubi->user_id)->images;
                        $usersByInterestArr[$ubi->user_id]['interests'][] = $ui;
                    }
                }
                // $user_interests[$k]['users'] =  $usersByInterestArr;
            }

            $data['match_recommendations'] =  array_values($usersByInterestArr);
        }else{
            $data['match_recommendations'] = false;
        }
        return Inertia::render('Home', $data);
    //    $deleteInterest =  UserInterest::where('id', $id)->delete();
    }
}
