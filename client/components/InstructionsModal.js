import { Modal } from 'antd'
import React from 'react'

const InstructionsModal = (props) => {

    const {isModalOpen, setIsModalOpen} = props;

    return (
        <Modal width={800} visible={isModalOpen} centered closeable footer={null} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
            <div className="grid grid-cols-7">
                <img src="/instructions.webp" className="h-72 my-auto col-span-3" />
                <div className="m-5 col-span-4">
                    <div className="text-4xl font-bold text-gray-600 mb-3">Instructions</div>
                    <h1 className="text-gray-500">Welcome to YelpFriends! Here are some instructions to take note while using our app:</h1>
                    <h1 className="text-gray-500 mt-6">1. We have provided a <span className="text-green-700">default user ID.</span> Should you wish to change it, key in your desired user ID and click on the log in button. Make sure the ID is <span className="text-green-700">valid and in range.</span></h1>
                    <h1 className="text-gray-500">2. You will need to <span className="text-green-700">load the data</span> for each of the data structures before proceeding to find your 1st and 2nd degree friends. We have hardcoded a value of 15,000 users to be loaded but this can be changed in the backend.</h1>
                    <h1 className="text-gray-500">3. Please find your 1st degree friends <span className="text-green-700">before</span> finding your 2nd degree friends.</h1>
                </div>
            </div>
        </Modal>
    )
}

export default InstructionsModal
