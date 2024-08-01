import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store"
import { MasterService } from "../service/master.service"
import { tap } from "rxjs";

// Define actions

export class LoadBlogs {
    static readonly type = '[Blog] Load';
}

export interface BlogStateModel {
    blogs: any[];
}

@State<BlogStateModel>({
    name: 'blog',
    defaults: {
        blogs: []
    }
})


@Injectable()
export class BlogState {

    constructor(private master: MasterService) { }

    @Selector()
    static getBlogs(state: BlogStateModel) {
        return state.blogs;
    }

    @Action(LoadBlogs)
    loadBlogs(ctx: StateContext<BlogStateModel>) {
        return this.master.getBlogs().pipe(
            tap((result) => {
                ctx.patchState({
                    blogs: result.data
                });
            })
        );
    }
    

}