module.exports = async (models) => {

    const data = [{
        name: 'get PMG',
        description: 'get you PMG here',
        cost: 10000,
    }];

    for(let i in data) {

        if (data.hasOwnProperty(i)) {

            await models.LawService.upsert({
                ...data[i],
                createdAt: new Date(),
                updatedAt: new Date()
            });

        }

    }

    return true;

};
