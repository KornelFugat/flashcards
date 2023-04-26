import React from 'react'
import './Popup.css'
import CardForm from '../CardForm/CardForm';
import { motion, AnimatePresence } from "framer-motion"

const Popup = (props) => {

  return (props.trigger) ? (
  
    <AnimatePresence>
        {props.trigger && (
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
                    <button className='close-btn' onClick={() => props.setTrigger(false)}></button>
                    {props.children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>

  ) : "";
};

export default Popup