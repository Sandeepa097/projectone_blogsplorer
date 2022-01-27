import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import NewDraft from "./../components/blog/NewDraft";
import Draft from "../components/blog/Draft";
import Count from '../services/docCount'
import LoadingIndicator from "../components/common/LoadingIndicator";

const BlogOverview = () => {
  const [loading, setLoading] = useState(true)
  const [smallStats, setSmallStats] = useState([])

  useEffect(() => {
    setLoading(true)
    Count.docCount().then(stats => {
      setSmallStats([...smallStats, ...stats])
      setLoading(false)
    })
  }, [])

  const changeDraftCount = (num) => {
    const index = smallStats.findIndex(item => item.label === 'Your Draft')
    let obj = smallStats[index]
    obj.value = Number(smallStats[index].value) + num
    setSmallStats([...smallStats.slice(0, index), obj, ...smallStats.slice(index+1)])
  }

  const changePublishCount = (num) => {
    const index = smallStats.findIndex(item => item.label === 'You Published')
    let obj = smallStats[index]
    obj.value = Number(smallStats[index].value) + num
    setSmallStats([...smallStats.slice(0, index), obj, ...smallStats.slice(index+1)])
  }

  return (
    <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Blog Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
      {loading && <LoadingIndicator />}
      {!loading && smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      {/* New Draft */}
      <Col lg="5" md="6" sm="12" className="mb-4">
        <NewDraft draftCount = {changeDraftCount} />
      </Col>

      {/* Discussions */}
      <Col lg="7" md="12" sm="12" className="mb-4">
        <Draft draftCount = {changeDraftCount} publishCount={changePublishCount}/>
      </Col>
    </Row>
  </Container>
  )
}

export default BlogOverview;