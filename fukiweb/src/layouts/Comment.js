import { Col, Image, Row } from "react-bootstrap"
import Moment from "react-moment"

const Comment = ({ obj, replies }) => {
    return (
        <>
            <Row className="m-1 p-1" key={obj.id}>
                <Col xs={3} md={1}>
                    <Image src={obj.user.avatar} alt={obj.user.username} width={50} rounded/>
                </Col>
                <Col xs={9} md={11}>
                    <p>{obj.content}</p>
                    <small>({obj.id}) Được bình luận bởi {obj.user.username} vào <Moment fromNow>{obj.created_date}</Moment> </small>
                </Col>
            </Row>
            {replies.length > 0 && (
                <div className="ms-4 p-1">
                    {replies.map(reply => (
                        <Comment 
                            key={reply.id} 
                            obj={reply} 
                            replies={reply.replies.length > 0 ? reply.replies : []} 
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default Comment