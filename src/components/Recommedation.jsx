'use client'

import React, { useState } from 'react'
import { Card, Table, Button, Modal, Label, TextInput, Textarea, Alert } from 'flowbite-react'
import { HiCheck, HiX, HiExclamation } from 'react-icons/hi'

// Mock data for demonstration
const initialRecommendations = [
  { id: 1, recommendation: 'Start statin therapy', rationale: 'Based on elevated cholesterol levels', benefits: 'Reduces risk of heart disease' },
  { id: 2, recommendation: 'Increase physical activity', rationale: 'High BMI and low physical activity', benefits: 'Improves cardiovascular health' },
  { id: 3, recommendation: 'Reduce sodium intake', rationale: 'High blood pressure detected', benefits: 'Helps control hypertension' },
]

export default function TreatmentRecommendationsPage() {
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecommendation, setSelectedRecommendation] = useState(null)
  const [actionComment, setActionComment] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const handleOpenModal = (recommendation) => {
    setSelectedRecommendation(recommendation)
    setActionComment('')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRecommendation(null)
  }

  const handleAccept = () => {
    setAlertMessage(`Accepted: ${selectedRecommendation.recommendation}`)
    handleCloseModal()
  }

  const handleReject = () => {
    setAlertMessage(`Rejected: ${selectedRecommendation.recommendation}`)
    handleCloseModal()
  }

  const handleCommentChange = (e) => {
    setActionComment(e.target.value)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Treatment Recommendations</h1>
      </div>

      {alertMessage && (
        <Alert color="success" icon={HiExclamation} onDismiss={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}

      <Card>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Recommendation</Table.HeadCell>
            <Table.HeadCell>Rationale</Table.HeadCell>
            <Table.HeadCell>Benefits</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {recommendations.map((recommendation) => (
              <Table.Row key={recommendation.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {recommendation.recommendation}
                </Table.Cell>
                <Table.Cell>{recommendation.rationale}</Table.Cell>
                <Table.Cell>{recommendation.benefits}</Table.Cell>
                <Table.Cell>
                  <Button className="bg-green-800" size="sm" onClick={() => handleOpenModal(recommendation)}>
                    <HiCheck className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Recommendation Details</Modal.Header>
        <Modal.Body>
          {selectedRecommendation && (
            <div className="space-y-4">
              <p><strong>Recommendation:</strong> {selectedRecommendation.recommendation}</p>
              <p><strong>Rationale:</strong> {selectedRecommendation.rationale}</p>
              <p><strong>Benefits:</strong> {selectedRecommendation.benefits}</p>

              <Label htmlFor="actionComment">Add a Comment</Label>
              <Textarea
                id="actionComment"
                value={actionComment}
                onChange={handleCommentChange}
                placeholder="Provide comments or adjustments"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-green-800" onClick={handleAccept}>
            Accept
          </Button>
          <Button color="failure" onClick={handleReject}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
