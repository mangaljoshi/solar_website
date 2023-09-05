<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\Lpv88Controller;
use App\Http\Controllers\SolarCaliforniaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [BaseController::class, 'home'])->name('home');
Route::post('/zip-data', [BaseController::class, 'zipForm'])->name('zip.post');
Route::get('/solar-wizard', [BaseController::class, 'solarWizard'])->name('solar.wizard');
Route::get('/form', [BaseController::class, 'form'])->name('form');
Route::get('/marketing-partners', [BaseController::class, 'marketingPartners'])->name('marketing');
Route::get('/terms', [BaseController::class, 'terms'])->name('terms');
Route::get('/do-not-sell', [BaseController::class, 'doNotSell'])->name('doNotSell');
Route::get('/contact', [BaseController::class, 'contact'])->name('contact');
Route::get('/privacy', [BaseController::class, 'privacy'])->name('privacy');
Route::get('/ccpa', [BaseController::class, 'ccpa'])->name('ccpa');
Route::get('/quote-report', [BaseController::class, 'quotereport'])->name('quotereport');
Route::post('/update-data/{step}', [BaseController::class, 'updateData'])->name('update.data');
// Route::post('/second-service', [BaseController::class, 'secondService'])->name('second.service');
Route::get('/thank-you', [BaseController::class, 'thankYou'])->name('thank.you');
Route::get('/verify-phone/{number}', [BaseController::class, 'verifyPhone'])->name('verify.phone');
Route::get('/second-service', [BaseController::class, 'secondService'])->name('secondService');


Route::group(['prefix'=>'{route_name}','as'=>'energybill.'], function(){
    Route::get('/', [BaseController::class, 'home'])->name('home');
    Route::post('/zip-data', [BaseController::class, 'zipForm'])->name('zip.post');
    Route::get('/form', [BaseController::class, 'form'])->name('form');
    Route::get('/solar-wizard', [BaseController::class, 'solarWizard'])->name('solar.wizard');
    Route::get('/marketing-partners', [BaseController::class, 'marketingPartners'])->name('marketing');
    Route::get('/do-not-sell', [BaseController::class, 'doNotSell'])->name('doNotSell');
    Route::get('/terms', [BaseController::class, 'terms'])->name('terms');
    Route::get('/contact', [BaseController::class, 'contact'])->name('contact');
    Route::get('/privacy', [BaseController::class, 'privacy'])->name('privacy');
    Route::get('/ccpa', [BaseController::class, 'ccpa'])->name('ccpa');
    Route::get('/quote-report', [BaseController::class, 'quotereport'])->name('quotereport');
    Route::post('/second-service', [BaseController::class, 'secondService'])->name('second.service');
    Route::get('/thank-you', [BaseController::class, 'thankyou'])->name('thank.you');
    Route::get('/thankyou-service', [BaseController::class, 'thankyouService'])->name('thank.you.service');
    // Route::get('/second-service', [BaseController::class, 'secondService'])->name('secondService');
    Route::post('/upsell-data', [BaseController::class, 'secondServiceData'])->name('upsell.data');
    
});

Route::post('/update-data-lpv23/{step}', [BaseController::class, 'updateSolarDataLPV23'])->name('update.roof.lpv23');