import { Inter } from 'next/font/google'
import {
    Box,
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Send} from "@mui/icons-material";
import CallAI from "@/service/callAI";

const useStyles = {
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '80vh',
        overflowY: 'auto'
    }
}

interface ResponseAI {
    result: [
        {
            label: string
            score: number;
        }
    ]
}
export default function Home() {
    const [texts, setTexts] = useState<string[]>([])
    const [value, setValue] = useState<string>("")
    const IA = new CallAI()
    const handleChange = (event: any) => {
        setValue(event.target.value)
    }

    const handleClick = () => {
        IA.predict(value).then(
            (response: any) => {
                const predict: ResponseAI = response.data
                if (predict.result[0].label === "LABEL_0") {
                    texts.push(value)
                    setTexts([...texts])
                } else {
                    console.log('Insult')
                    console.log(predict.result)
                    console.log(value)
                    texts.push(`Votre message "${value}" peut être mal interprété ou est malveillant`)
                    texts.push(value)
                    setTexts([...texts])
                }
        })

    }

    function getListItem() {
        return texts.map((text: string, index: number) => (
            <ListItem key={index}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText primary={text}></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        ))
    }

    return (
        <Box>
            <Box className="grid grid-cols-12 m-6">
                <Typography className="col-span-2 col-start-6 flex justify-center" variant="h1">Chat</Typography>
            </Box>
            <Box className="grid grid-cols-12 m-6">
                <Box className="col-span-8 col-start-3">
                    <Grid container component={Paper} sx={useStyles.chatSection}>
                        <Grid item xs={12}>
                            <List sx={useStyles.messageArea}>
                                {getListItem()}
                            </List>
                        </Grid>
                    </Grid>
                    <Grid container style={{padding: '20px', width: "100%"}}>
                        <Grid item xs={11}>
                            <TextField
                                onChange={handleChange}
                                id="outlined-basic-email"
                                label="Type Something"
                                fullWidth/>
                        </Grid>
                        <Grid xs={1}>
                            <Fab onClick={handleClick} color="primary" aria-label="add"><Send/></Fab>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Box>
  )
}
