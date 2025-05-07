export {removetv} from '../Reducers/tvSlice'
import axios from '../../Utils/Axios'
import {loadtv} from '../Reducers/tvSlice'

export const asyncloadtv = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendation = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

        let ultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendation: recommendation.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((item) => item.type === 'Trailer'),
            translations: translations.data.translations.map((t)=>t.name),
            watchproviders: watchproviders.data.results.IN,
        
        }
        dispatch(loadtv(ultimatedetails));
        console.log(ultimatedetails);

    }
    catch (error) {
        console.log("Error", error);
    }
    
}