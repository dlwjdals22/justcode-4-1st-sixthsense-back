const dormListDao = require('../models/dormListDaoHN')

const getDormitories = () => {
    const dormitories = dormListDao.getDormitories()
    return dormitories
}

const getSearchedDormitories = async (keyword,category) => {
    const trueValues = [];
    const empty = ' ';

    const inKorean = {
        'all': '모두',
        'pension' : '펜션',
        'guestHouse' : '게스트하우스',
        'hotel' : '호텔',
        'rentalHouse': '렌탈 하우스'
    }

    for(i in category){
        if(category[i]){
            trueValues.push(i);
            category[i] = inKorean[i];
        }else{
            category[i] = empty;
        }
    }
    const {all, pension, guestHouse, hotel, rentalHouse} = category;
    
    let isAll = null;
    if(trueValues.length== 0 || all == '모두'){
        isAll = true;
    }else{
        isAll = false;
    }
    const searchedDormitories = await dormListDao.getSearchedDormitories(keyword, isAll, pension, guestHouse, hotel, rentalHouse)

    return searchedDormitories
}

module.exports = {getDormitories, getSearchedDormitories}