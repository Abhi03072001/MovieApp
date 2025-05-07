export {removeMovie} from '../Reducers/movieSlice'
import axios from '../../Utils/Axios'
import {loadmovie} from '../Reducers/movieSlice'

export const asyncloadmovie = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendation = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

        let ultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendation: recommendation.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((item) => item.type === 'Trailer'),
            translations: translations.data.translations.map((t)=>t.name),
            watchproviders: watchproviders.data.results.IN,
        
        }
        dispatch(loadmovie(ultimatedetails));
        console.log(ultimatedetails);

    }
    catch (error) {
        console.log("Error", error);
    }
    
}