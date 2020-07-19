import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import { db } from '../firebase';
import { toast } from 'react-toastify'


const Links = () => {

    const [links, setLinks] = useState([])
    const [currentId, setcurrentId] = useState('')


    const addOrEditLink = async (linkObject) => {
        try {
            if(currentId === ''){
                await db.collection('links').doc().set(linkObject);
                toast('New Link',{
                    type:'success'
                })
            }else{
                await db.collection('links').doc(currentId).update(linkObject)
                toast('Edit Link',{
                    type:'info'
                })
    
                setcurrentId('')
            }
        } catch (error) {
            console.error(error)
        }
        
    }

    const getLinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setLinks(docs)
        });

    }

    const onDeleteLink=async (id)=>{
        if(window.confirm('are you sure ? ')){
           await db.collection('links').doc(id).delete();
           toast(' Link Delet',{
            type:'error',
            autoClose:2000,
        })
        }
    }

    useEffect(() => {
        getLinks();
    }, [])
    return (
        <>
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEditLink,currentId,links}} />
            </div>
            <div className="col-md-8 p-2">
                {links.map(link => (
                    <div className="card m-1" key={link.id}>
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                                <h4>{link.name}</h4>
                                <div>
                                <i className='material-icons text-danger' style={{cursor:'pointer'}} onClick={() => onDeleteLink(link.id)}>close</i>
                                <i className='material-icons' style={{cursor:'pointer'}} onClick={()=>setcurrentId(link.id)} >create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target='_blank' rel='noopener noreferrer'>Go to Web</a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Links