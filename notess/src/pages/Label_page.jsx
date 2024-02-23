import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Notes from '../1.components/Notes/Notes';
import { useSelector } from 'react-redux';

function Label_page() {

    // const [changed, setChanged] = useState(false)
    const { name } = useParams();
    const value = useSelector((state) => state.clickToShow.clickValue);

    if (name) {
        console.log(`${name}_page`);
    }

    return (
        <>
            <Notes labelName={name} />
        </>
    )

}

export default Label_page
