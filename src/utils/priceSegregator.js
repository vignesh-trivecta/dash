export const segregate = (num) => {

    // checking whether input is empty or undefined
    if (num == "" || num == undefined){
        return "";
    }
    
    let val;
    let deci;

    // condition to split if decimal values are present
    if(String(num).includes('.')){
        let numb = String(num).split('.');
        val = numb[0].split('');
        deci = numb[1].slice(0,2);
    }
    else{
        val = String(num).split('');
    }

    // condition to apply ',' in our number
    let len = val.length;
    let iterations = Math.round(len/3);
    while(iterations!=0)
    {
        let i = -3;
        let j = (i*iterations);
        val.splice(j,0,',');
        if(val[0] == ','){
            val.shift();
        }
        iterations--;
    }

    // returning based on presence of decimal values
    if(deci != undefined){
        return val.join('')+'.'+deci;
    }
    else{
        return val.join('');
    }
}