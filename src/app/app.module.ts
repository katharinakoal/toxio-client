import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppConfig } from './app.config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Pro } from '@ionic/pro';
import { DataExchangeProvider } from '../providers/data-exchange/data-exchange';

const IonicPro = Pro.init('d247ab47', {
    appVersion: '0.0.1'
});

@Injectable()
export class ToxioErrorHandler implements ErrorHandler {
    ionicErrorHandler: IonicErrorHandler;

    constructor(injector: Injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        } catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }

    handleError(err: any): void {
        IonicPro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    }
}

@NgModule({
    declarations: [MyApp, HomePage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        AppConfig
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage],
    providers: [
        StatusBar,
        SplashScreen,
        IonicErrorHandler,
        { provide: ErrorHandler, useClass: ToxioErrorHandler },
        DataExchangeProvider
    ]
})
export class AppModule {}
