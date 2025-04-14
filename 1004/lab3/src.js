const baseStory = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.'

const genStoryBut = document.querySelector('#generateStoryBut');

function getFormValue(){
    let selectedValue = document.querySelector("input[name='units']:checked");

    if (!selectedValue){
        return 0;
    }

    return selectedValue.value;   
}

function getRandomNum(limit){
    return Math.floor(Math.random() * limit)
}

function replacePlaceHolders(){
    insertXitems = ['Willy the Goblin', 'Big Daddy', 'Father Christmas']
    insertYitems = ['the soup kitchen', 'Disneyland', 'the White House']
    insertZitems = [ 'spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away']

    Xvalue = insertXitems[getRandomNum(3)];
    Yvalue = insertYitems[getRandomNum(3)];
    Zvalue = insertZitems[getRandomNum(3)];

    return baseStory.replace(':insertx:', Xvalue)
            .replace(':inserty:', Yvalue)
            .replace(':insertz:', Zvalue);
}

function convertUnits(generatedStory){
    return generatedStory.replace('94 fahrenheit','34 celsius')
                .replace('300 pounds','136 kilograms');
}

function getStory(unitOption){  
    if (unitOption===0){
        return 'You need to select US or UK'
    }

    let generatedStory = replacePlaceHolders()
    if (unitOption===2){
        generatedStory = convertUnits(generatedStory)
    }

    return generatedStory
}

genStoryBut.addEventListener('click',()=>{
    let unitOption = getFormValue();
    let story = getStory(unitOption);

    console.log(story);

});