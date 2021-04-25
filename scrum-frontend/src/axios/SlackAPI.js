import axios from 'axios';

const baseURL = 'https://hooks.slack.com/services/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';

const sendAlert = async( data )=> {
    const res = await axios(
        {
            method: 'post',
            url: baseURL,
            data: data
        }
    )
    return res
}

export default sendAlert;