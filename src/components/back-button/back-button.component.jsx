import { useNavigate } from "react-router-dom"

export default function BackButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("../");
  }
  return (
    <button className='nav-link back-button' onClick={handleClick}>Back</button>
  )
}
