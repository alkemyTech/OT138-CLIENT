import styled from '@emotion/styled';


export const Form = styled.form`
background-color:#fff;
width:500px;
padding:20px 20px 50px 20px;
font-family: "Open Sans", sans-serif;
border-radius:10px;
margin:auto;
margin-top:100px;
-webkit-box-shadow: 0px 2px 15px 2px #000000; 
box-shadow: 0px 2px 15px 2px #000000;
@media (max-width:500px){
width:100%;
margin-top:20px;
}
`;


export const Input = styled.input`
font-family: "Open Sans", sans-serif;
min-width: 180px;
width: 100%;
background: #edf2f7;
border: none;
font-size: 1rem;
height: 48px;
padding: 0 0.5rem;
border-radius: 0.25rem;
border: 2px solid transparent;
transition: all 0.2s ease 0s;
outline: none;
margin: 0 0 0.5rem 0;
/* Chrome, Safari, Edge, Opera */
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
/* Firefox */
[type="number"] {
-moz-appearance: textfield;
}
input[type="date"]:after {
content: attr(placeholder);
}

`;


export const Label = styled.label`
font-size:18px;
margin:20px 0px 10px 0px;
display:block;
font-weight:bold;

`;


export const ButtonGroup = styled.div`
display: flex;
flex-direction: row;
width:100%;
justify-content:center;
`;


export const Button = styled.button`
background-color: #000000;
color: #ffffff;
outline: none;
border: none;
border-radius: 5px;
font-size: 1rem;
cursor: pointer;
max-width: 200px;
margin:0px 5px;
font-family: "Open Sans", sans-serif;
&:hover {
transform: scale(1.02);
}
`;


export const MessageError = styled.p`
color:#D82148;
font-size:16px;
font-family: "Open Sans", sans-serif;
`;



export const Container = styled.div`
width: 1000px;
height: auto;
margin: auto;
font-family: "Open Sans", sans-serif;
text-align:center;
@media (max-width: 1000px) {
width: 100%;
}`;


export const Table = styled.table`
margin-top: 2px;
font-family: "Open Sans", sans-serif;
box-sizing: border-box;
text-align: center;
border-collapse: separate
border-style: hidden;
width: 100%;
overflow-x: auto;
table-layout: fixed;
thead th {
padding: 10px;
background: #ddd;
}
    
tbody td {
padding: 10px;
word-wrap: break-word;
}

tbody tr:nth-of-type(odd) {
background: #eee;
}

tbody tr:last-child {
border-bottom: 2px solid #ddd;
}

@media (min-width: 850px) {
table-layout: auto;
}

`;

export const ContainerModal = styled.div`
width:100%;
height:100vh;
background-color: rgba(0, 0, 0, 0.5);
position:absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
transition: 1s ease;
overflow:hidden;
opacity:${props => props.opacity && props.opacity};
z-index:${props => props.index && props.index};
`;



