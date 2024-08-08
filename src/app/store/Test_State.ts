import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store"
import { MasterService } from "../service/master.service"
import { tap } from "rxjs";
import {IndexedDbService} from '../service/indexed-db-service.service'

// Define actions
export class LoadTests {
    static readonly type = '[Test] Load';
}

// Define the state model
export interface TestStateModel {
    tests: any[];
    loading: boolean;
}

// Define the state
@State<TestStateModel>({
    name: 'tests',
    defaults: {
        tests: [],
        loading: false
    }
})



@Injectable()
export class TestState {

    constructor(private master: MasterService,
        private IndexedDbService: IndexedDbService
    ) { }

    @Selector()
    static getTests(state: TestStateModel) {
        return state.tests;
    }

    // @Action(LoadTests)
    // loadTests(ctx: StateContext<TestStateModel>) {
    //     return this.master.getAllOrganWise(6).pipe(
    //         tap((result) => {
    //             ctx.patchState({
    //                 tests: result
    //             });
    //         })
    //     );
    // }

    @Action(LoadTests)
    async loadTests(ctx: StateContext<TestStateModel>) {
        const state = ctx.getState();

        if (state.loading) {
            // Prevent multiple simultaneous requests
            return;
        }

        // Set loading state to true
        ctx.patchState({ loading: true });

        try {
            const result = await this.IndexedDbService.getAllItems('Organ_wise');
            ctx.patchState({
                tests: result,
                loading: false // Reset loading state after fetching data
            });
        } catch (error) {
            console.error('Failed to load tests from IndexedDB:', error);
            ctx.patchState({ loading: false }); // Reset loading state in case of error
        }
    }


}