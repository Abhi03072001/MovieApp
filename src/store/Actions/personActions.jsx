export {removeperson} from '../Reducers/personSlice'
import axios from '../../Utils/Axios'
import {loadperson} from '../Reducers/personSlice'

export const asyncloadperson = (id) => async (dispatch) => {
    try { 
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        // const recommendation = await axios.get(`/person/${id}/recommendations`);
        // const similar = await axios.get(`/person/${id}/similar`);
        // const videos = await axios.get(`/person/${id}/videos`);
        // const translations = await axios.get(`/person/${id}/translations`);
        // const watchproviders = await axios.get(`/person/${id}/watch/providers`);

        let ultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedCredits: combinedCredits.data,
            movieCredits: movieCredits.data,
            tvCredits: tvCredits.data,
            // recommendation: recommendation.data.results,
            // similar: similar.data.results,
            // videos: videos.data.results.find((item) => item.type === 'Trailer'),
            // translations: translations.data.translations.map((t)=>t.name),
            // watchproviders: watchproviders.data.results.IN,
        
        }
        dispatch(loadperson(ultimatedetails));
        console.log(ultimatedetails);

    }
    catch (error) {
        console.log("Error", error);
    }
    
}