import {imageupload} from "../../utils/imageupload";
import {getDataApi, postDataApi , patchDataApi, deleteDataApi} from "../../utils/fetchDataApi";
import {createNotify, removeNotify} from "./notifyActions"


export const COMPANY_TYPES= {
    CREATE_COMPANY : "CREATE_COMPANY",
    GET_COMPANIES :"GET_COMPANIES",
    UPDATE_COMPANY : "UPDATE_COMPANY",
    LOADING_COMPANIES :"LOADING_COMPANIES",
    GET_COMPANY:"GET_COMPANY",
    DELETE_COMPANY:"DELETE_COMPANY"
}


export const createcompany = ({content, images, auth, socket}) => async(dispatch) => {


    let media= [];

    try {

        dispatch({type:'ALERT', payload:{loading: true}})

        if(images.length > 0) media = await imageupload(images);

        const res = await postDataApi('posts', {content, images: media}, auth.token)
        dispatch({type: COMPANY_TYPES.CREATE_COMPANY, payload: {...res.data.newPost, user: auth.user}})
        dispatch({type:'ALERT', payload:{loading: false}})


        //notify
        const msg = {
            id: res.data.newPost._id,
            text:'added a new Post',
            url: `/post/${res.data.newPost._id}`,
            recipients: res.data.newPost.user.friends,
            content,
            image:media[0].secure_url,

        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: "Do not"
            }
        })

    }
}

export const getCompany = (token) => async (dispatch) =>{
    try {
        dispatch({type: COMPANY_TYPES.LOADING_COMPANIES, payload: true})
        const res = await getDataApi('posts',token)
        dispatch({type:COMPANY_TYPES.GET_COMPANIES , payload: res.data})
        dispatch({type: COMPANY_TYPES.LOADING_COMPANIES, payload:false})

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}

export const updatecompany = ({content, images, auth, status}) => async(dispatch) => {


    let media= [];
    const newimgUrl = images.filter( img => !img.secure_url)
    const oldimgUrl = images.filter( img => img.secure_url)
    console.log({oldimgUrl, newimgUrl})
    if(status.content === content &&
        newimgUrl.length === 0 &&
        oldimgUrl.length === status.images.length)
        return;
    try {

        dispatch({type:'ALERT', payload:{loading: true}})

        if (newimgUrl.length > 0) media = await imageupload(newimgUrl);

        const res = await patchDataApi(`post/${status._id}`,
            {content,
                images: [...oldimgUrl, ...media]}, auth.token)



        dispatch({type:'ALERT', payload:{success: res.data.msg}})

        dispatch({type: COMPANY_TYPES.UPDATE_COMPANY, payload: res.data.newPost})
        dispatch({type:'ALERT', payload:{loading: false}})




    }
    catch (err) {
        dispatch({
            type:'ALERT',
            payload: {
                error: "nothin"
            }
        })

    }
}


export  const getCompanysingle = ({detailPost, auth, id}) => async (dispatch) =>{

    if(detailPost.every(item => item._id !== id)){
        try {
            const res= await getDataApi(`post/${id}`,auth.token)
            console.log(res)
            dispatch({type: COMPANY_TYPES.GET_COMPANY, payload:res.data.post})
        } catch (err) {
            dispatch({
                type:'ALERT',
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const savedCompany = ({pos,auth}) => async (dispatch) => {

    const newUser={...auth.user, saved:[...auth.user.saved, pos._id]}

    dispatch({type:'AUTH', payload:{...auth, user: newUser}})
    try {
        const res= await patchDataApi(`save/${pos._id}`,null, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}
export const unsavedCompany = ({pos,auth}) => async (dispatch) => {

    const newUser={...auth.user, saved:auth.user.saved.filter(id=> id !== pos._id)}
    console.log(newUser)
    dispatch({type:'AUTH', payload:{...auth, user: newUser}})
    try {
        const res= await patchDataApi(`unsave/${pos._id}`,null, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}

export const deleteCompany = ({pos, auth,socket}) => async (dispatch) =>{

    dispatch({type:COMPANY_TYPES.DELETE_COMPANY, payload: pos})
    try {

        const res = await deleteDataApi(`post/${pos._id}`, auth.token)
        //notify
        const msg = {
            id: pos._id,
            text:'added a new Post',
            recipients: res.data.newPost.user.friends,
            url: `/post/${pos._id}`,
        }

        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}
