import { useState } from 'react'
import IssueLog from './IssueLog'
import IssueDetail from './IssueDetail'

const IssueTracker = () => {
  const [selectedIssue, setSelectedIssue] = useState(null)

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue)
  }

  const handleBackToLog = () => {
    setSelectedIssue(null)
  }

  if (selectedIssue) {
    return (
      <IssueDetail 
        issue={selectedIssue} 
        onBack={handleBackToLog}
      />
    )
  }

  return (
    <IssueLog onIssueSelect={handleIssueSelect} />
  )
}

export default IssueTracker

