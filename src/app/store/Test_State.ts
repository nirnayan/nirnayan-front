import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store"
import { MasterService } from "../service/master.service"
import { tap } from "rxjs";

// Define actions
export class LoadTests {
    static readonly type = '[Test] Load';
}

// Define the state model
export interface TestStateModel {
    tests: any[];
}

// Define the state
@State<TestStateModel>({
    name: 'tests',
    defaults: {
        tests: []
    }
})



@Injectable()
export class TestState {

    constructor(private master: MasterService) { }

    @Selector()
    static getTests(state: TestStateModel) {
        return state.tests;
    }

    @Action(LoadTests)
    loadTests(ctx: StateContext<TestStateModel>) {
        return this.master.getAllOrganWise(6).pipe(
            tap((result) => {
                ctx.patchState({
                    tests: result
                });
            })
        );
    }


}