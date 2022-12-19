import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Head from 'next/head';
import axios from 'axios'
import styles from './Edit.module.css'


export default function AddMember (props) {

    const [name, setName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [paragraph, setParagraph] = useState('')
    const [date, setDate] = useState('')

    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        const fetchAbout = () => {
            axios
            .get('http://localhost:5000/members/' + id)
            .then((res) => {
                setName(res.data.name)
                setOccupation(res.data.occupation)
                setParagraph(res.data.bio)
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        fetchAbout()
    }, [id])

    const submitHandle = () => {
        alert('works')
    }

    const handleName = ({target:{value}}) => setName(value)
    const handleOccupation = ({target:{value}}) => setOccupation(value)
    const handleParagraph = ({target:{value}}) => setParagraph(value)
    const handleDate = ({target:{value}}) => setDate(value)

    const cancelHandler = () => {
        window.location = '/members'
    }

    const [image, setImage] = useState("")
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Member | Add</title>
            </Head>
            <div className={styles.editMember}>
                <form onSubmit={submitHandle} encType="multipart/form-data">
                    <div className={styles.title}>
                        <div className={styles.bar}/>
                        <div className={styles.image}><Image alt='' src={image} layout='fill'/></div>
                        <input type="file" onChange={onImageChange}></input>
                    </div>
                    <div className={styles.inputs}>
                        <div>
                            <input value={name} placeholder="Name" onChange={handleName} />
                            <input value={occupation} placeholder="Occupation" onChange={handleOccupation} />
                            <input value={date} placeholder="Member Since" onChange={handleDate} />
                        </div>
                        <textarea value={paragraph} placeholder="Paragraph" onChange={handleParagraph} />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit">Add</button>
                        <button onClick={cancelHandler}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();