import { Modal } from 'antd'
import React from 'react'

const InstructionsModal = (props) => {

    const {isModalOpen, setIsModalOpen} = props;

    return (
        <Modal width={800} visible={isModalOpen} centered closeable footer={null} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
            <div className="grid grid-cols-7">
                <img src="/instructions.webp" className="h-72 my-auto col-span-3" />
                <div className="m-5 col-span-4">
                    <div className="text-5xl font-bold text-gray-600 mb-3">Instructions</div>
                    <h1 className="text-gray-500">Welcome to YelpFriends! Here are some instructions to take note while using our app:</h1>
                    <h1 className="text-gray-500">1. We have provided a default user id. Should you decide to change it, key in your desired user id and click on the log in button but make sure it is valid and in range. </h1>
                    <h1 className="text-gray-500">2. You will need to load the data for each of the data structures before proceeding to find your 1st and 2nd degree friends. We have hardcoded a value of 15,000 users to be loaded but this can be changed in the backend.</h1>
                    <h1 className="text-gray-500">3. Please find your first degree friends before finding your second degree friends</h1>
                </div>
            </div>
        </Modal>
    )
}

export default InstructionsModal
