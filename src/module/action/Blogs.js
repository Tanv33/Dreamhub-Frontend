import axios from "axios";


// get All Blog
export const GET_ALL_BLOG_LOADER = "GET_ALL_BLOG_LOADER";
export const getBlogsLoader = (bool) => ({
    type: 'GET_ALL_BLOG_LOADER',
    payload: bool,
});


export const GetAllBlogs = (userId) => {
    return async (dispatch) => {
        dispatch(getBlogsLoader(true))
        var config = {
            method: 'get',
            url: 'https://dreamhub-backend.herokuapp.com/api/v1/user/blog',

        };

        axios(config)
            .then(function (response) {
                dispatch(getBlogsLoader(false))
                dispatch(getBlogData(response.data.blogs))
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                dispatch(getBlogsLoader(false))
                console.log(error);
            });

    };
};

//Set User Profile
export const GET_BLOG_DATA = "GET_BLOG_DATA";
export const getBlogData = (payload) => ({
    type: GET_BLOG_DATA,
    payload: payload,
});



// update Blog
export const GET_BLOG_LOADER = "GET_BLOG_LOADER";
export const getSingleBlogDataLoader = (bool) => ({
    type: 'GET_BLOG_LOADER',
    payload: bool,
});

export const getSingleBlog = (id) => {
    return async (dispatch) => {
        dispatch(getSingleBlogDataLoader(true))
        var config = {
            method: 'get',
            url: ` https://dreamhub-backend.herokuapp.com/api/v1/user/blog/single/${id}`,

        };

        axios(config)
            .then(function (response) {
                dispatch(getSingleBlogDataLoader(false))
                console.log(response.data.blog)
                dispatch(getSingleBlogData(response.data.blog))
            })
            .catch(function (error) {
                dispatch(getSingleBlogDataLoader(false))
                console.log(error);
            });

    };
};
//Set User Profile
export const GET_SINGLE_BLOG_DATA = "GET_SINGLE_BLOG_DATA";
export const getSingleBlogData = (payload) => ({
    type: GET_SINGLE_BLOG_DATA,
    payload: payload,
});