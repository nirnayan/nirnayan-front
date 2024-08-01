import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store"
import { MasterService } from "../service/master.service"
import { tap } from "rxjs";

export class LoadBanners {
    static readonly type = '[Banner] Load';
}

export interface BannerStateModel {
    banner: any[];
}

@State<BannerStateModel>({
    name: 'data',
    defaults: {
        banner: []
    }
})

@Injectable()
export class ProductState {

    constructor(private master: MasterService) { }

    @Selector()
    static getBanner(state: BannerStateModel) {
        return state.banner;
    }

    @Action(LoadBanners)
    loadBanner(ctx: StateContext<BannerStateModel>) {
        return this.master.getBannerContent('website').pipe(
            tap((result) => {
                const state = ctx.getState();
                ctx.setState ({
                    ...state,
                    banner: result.data
                });
            })
        );
    }
}