import { GET_ALL_BLOG_LOADER, GET_BLOG_DATA, GET_BLOG_LOADER, GET_SINGLE_BLOG_DATA } from "../action/Blogs";

const initialState = {
    blogData: false,
    blogDataLoader: false,
    singleBlog:false,
    singleBlogLoader:false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOG_DATA:
            return {
                ...state,
                blogData: action.payload,
            };
            
        case GET_SINGLE_BLOG_DATA:
            return {
                ...state,
                singleBlog: action.payload,
            };
                     
        case GET_ALL_BLOG_LOADER:
            return {
                ...state,
                blogDataLoader: action.payload,
            };
            case GET_BLOG_LOADER:
                return {
                    ...state,
                    singleBlogLoader: action.payload,
                };
            
        default:
            return {
                ...state
            }

    }
}