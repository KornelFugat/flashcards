import React from 'react'
import './Popup.css'
import CardForm from '../CardForm/CardForm';
import { motion, AnimatePresence } from "framer-motion"
import { forwardRef, useImperativeHandle, useState } from 'react';

const Popup = forwardRef((props, ref) => {
    const [open, setOpen] = useState(true)

    useImperativeHandle(ref, () => {
        return{
            open: () => setOpen(true),
            close: () => setOpen(false)
        }
    })

  return (props.trigger) ? (
  
    <AnimatePresence>
        {open && (
            <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1       
            }}
            exit={{
                opacity: 0 
            }}
            className='popup'>
                <motion.div 
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1       
                }}
                exit={{
                    scale: 0 
                }}
                className='popup-inner'>
                    <h2>Add new flashcard</h2>
                    <CardForm />
                    <button className='close-btn' onClick={() => props.setTrigger(false)} onClick={() => setOpen(false)}></button>
                    {props.children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>

  ) : "";
});

export default Popup