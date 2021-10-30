module.exports = {
    getSad(){
        let sad = ['https://imgur.com/OG9bGhg', 'https://imgur.com/5d1R0xZ',
                    'https://imgur.com/sdycaLj', 'https://imgur.com/7SVnMro',
                    'https://imgur.com/6aKZ61S'
        ];
        let randint = Math.floor(Math.random()*happy.length);
        return sad[randint];
    },

    getHappy() {
        let happy = [
            'https://imgur.com/3cK8FUV', 'https://imgur.com/7MO0DIG',
            'https://imgur.com/B6MD17g', 'https://imgur.com/B6MD17g',
            'https://imgur.com/zYzO4qq'
        ];
        let randint = Math.floor(Math.random()*happy.length);
        return happy[randint];
    }
        
};