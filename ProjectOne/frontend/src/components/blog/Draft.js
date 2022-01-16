import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box"
import Blog from "../../services/blogs";
import LoadingIndicator from "../common/LoadingIndicator";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
} from "shards-react";
import { UserStore, Dispatcher, Constants } from "../../flux";

const Draft = () => {
  const title = "Your Draft"
  const [alertMessage, setAlertMessage] = useState("")

  const [loading, setLoading] = useState(true)
  const [drafts, setDrafts] = useState(UserStore.getUserDetails().draft)
  const [draftLength, setDraftLength] = useState(UserStore.getUserDetails().draft.length)
  const [count, setCount] = useState(3)

  useEffect(() => {
    setLoading(true)
    UserStore.addChangeListener(setDetails)
    setLoading(false)

    return() => {
      UserStore.removeChangeListener(setDetails)
    }
  }, [])

  const setDetails = () => {
    setDraftLength(UserStore.getUserDetails().draft.length)
    setDrafts([...UserStore.getUserDetails().draft])
  }

  const viewAll = (event) => {
    setCount(draftLength)
  }

  const seeLess = (event) => {
    setCount(3)
  }
 
  const deletePost = async(id) => {
    const conf = await confirm("Are you sure you want to delete?")
    if(conf) {
      Dispatcher.dispatch({
        actionType: Constants.DELETE_DRAFT,
        payload: {id: id}
      })
      await Blog.deletePostDraft(id)
      if(count !== 3) {
        setCount(count - 1)
      }
      setAlertMessage("Post deleted successfully..")
      setTimeout(() => {
        setAlertMessage("")
      }, 3000)
    }
  }

  const publishPost = async(id) => {
    await Blog.publishPostFromDraft(id)
    Dispatcher.dispatch({
      actionType: Constants.PUBLISH_DRAFT,
      payload: {id: id, reset: false}
    })
    if(count !== 3) {
      setCount(count - 1)
    }
    setAlertMessage("Post is now published..")
    setTimeout(() => {
      setAlertMessage("")
    }, 3000)
  }

  const editDraft = (id) => {
    const post = UserStore.editDraft(id)
    Dispatcher.dispatch({
      actionType: Constants.EDIT_POST,
      payload: post
    })
  }

  return(
    <Card small className="blog-comments">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      {drafts.slice(0, count).map((draft, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3">
          {/* Avatar */}
          <div className="blog-comments__avatar mr-3">
            <img src={draft.backgroundImage ? draft.backgroundImage : null} alt={draft.backgroundImage ? draft.title.substring(0, 5) : null} />
          </div>

          {/* Content */}
          <div className="blog-comments__content">
            {/* Content :: Title */}
            <div className="blog-comments__meta text-mutes">
                {draft.title} - {draft.date}
            </div>

            {/* Content :: Body */}
            <p className="m-0 my-1 mb-2 text-muted">{draft.body.toString().replace(/<\/?[^>]+(>|$)/g, "")}</p>

            {/* Content :: Actions */}
            <div className="blog-comments__actions">
              <ButtonGroup size="sm">
                <Button theme="white" onClick = {e=> publishPost(draft._id)}>
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                  Publish
                </Button>
                <Button theme="white" onClick={e=> deletePost(draft._id)}>
                  <span className="text-danger">
                    <i className="material-icons">clear</i>
                  </span>{" "}
                  Delete
                </Button>
                <Button tag={Link} to="add-new-post" theme="white" onClick={e=> editDraft(draft._id)}>
                  <span className="text-light">
                    <i className="material-icons">edit</i>
                  </span>{" "}
                  Edit
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ))}
    </CardBody>
    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <div style={{width: "80px", margin: "auto"}}>{loading && <LoadingIndicator />}</div>
          {count < draftLength && !loading && <Button theme="white" onClick={e => viewAll(e)}>
            View All
          </Button>}
          {draftLength > 3 && count === draftLength && <Button theme="white" onClick={e => seeLess(e)}>
            See Less
          </Button>}
          {!draftLength && <div>Draft is empty...</div>}
          <span style={{"color": "green"}}>{alertMessage}</span>
        </Col>
      </Row>
    </CardFooter>
  </Card>
  )

};

export default Draft;
