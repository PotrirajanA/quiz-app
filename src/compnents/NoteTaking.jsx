import React, { useEffect, useState } from "react";
import { jsxs } from "react/jsx-runtime";

const NoteTaking = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [editId, setEditId] = useState(null);

  // get unique tags
  const uniqueTags = [...new Set(notes.flatMap((note)=>note.tags))];

  // Filter Notes based on tag

  const filterNotes = filterTags ? notes.filter((note)=>note.tags.includes(filterTags)) : notes ;

  //Save Changes in LocalStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!title || !content){
      return;
    }
    if(editId){
      setNotes(notes.map((note)=> note.id == editId ? {...note, title,content,tags:tags.split(",").map((tag)=>tag.trim()).filter((tag)=>tag),updatedAt: new Date().toLocaleString()} : note));

      setEditId(null);
    }
    else{
      // insert newnote
      const newNote = {
        id: Date.now(),
        title,
        content,
        tags:tags.split(",").map((tag)=>tag.trim()).filter((tag)=>tag),
        createdAt:new Date().toLocaleString(),
        updatedAt:new Date().toLocaleString()
      };
      setNotes([...notes, newNote]);
    }
    setTitle("");
    setContent("");
    setTags("");
  };

  // Delete Notes

  const deleteNote = (id)=>{
    if(confirm("Are you sure Delete ?")){
      setNotes(notes.filter((note)=> note.id !== id));
    }
  }

  // Edit Notes

  const editNote = (note)=>{
    setEditId(note.id),
    setTitle(note.title),
    setContent(note.content),
    setTags(note.tags.join(" , "));
  }

  return (
    <>
      <div className="bg-rose-50 p-5 min-h-screen">
        <div className="max-w-2xl md:max-w-4xl mx-auto">
          <h2 className="text-center font-bold text-xl uppercase mt-5 text-rose-600 tracking-wider">
            note taking application
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 my-3 shadow">
              <input
                type="text"
                placeholder="Note Title"
                className="p-2 md:pt-0 border border-gray-400 rounded focus:outline-fuchsia-300 text-gray-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Note Content"
                className="p-2 border border-gray-400 rounded focus:outline-fuchsia-300 text-gray-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <input
                placeholder="Tag (comma-separated)"
                className="p-2 border border-gray-400 rounded focus:outline-fuchsia-300 text-gray-500"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <button
                type="submit"
                className= {` ${editId ? "bg-yellow-700 hover:bg-yellow-800" : "bg-pink-700 hover:bg-pink-800"} cursor-pointer transition text-white font-semibold p-2 rounded`}
              >
                {editId ? "Update Data" : "Add Data"}
              </button>
            </div>
          </form>

          <select value={filterTags} onChange={(e)=>setFilterTags(e.target.value)} className="bg-white w-full p-2 rounded shadow focus:outline-fuchsia-300">
            <option value="">All Tage</option>
            {uniqueTags.map((tag,index)=>(
               <option key={index} value={tag}>{tag}</option>
            ))}
          </select>

          <div className="bg-white mt-5 p-4 rounded-lg shadow">
            <h3 className="text-gray-600 font-semibold">Your Notes</h3>
            <p className="text-gray-500 text-center p-5 "></p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterNotes.map((note)=>(
                <li key={note.id} className='cursor-pointer p-5 bg-gray-50 rounded shadow hover:shadow-lg transition-all duration-300'>
                    <h3 className='text-xl font-medium text-rose-700'>{note.title}</h3>
                    <p className='mt-2 text-gray-600 line-clamp-2'>{note.content}</p>
                    <p className='text-sm text-gray-500 mt-2'>
                        <span className='font-medium'>Tags:  {note.tags.join(" , ") || "None"}</span> 
                    </p>
                    <p className='text-sm text-gray-500 mt-2'>
                        <span className='font-medium'>Created: {note.createdAt} </span>
                    </p>
                     <p className='text-sm text-gray-500 mt-2'>
                        <span className='font-medium'>Updated: {note.updatedAt} </span>
                    </p>

                    <div className='mt-4 flex gap-3'>
                        <button className='px-4 py-1 rounded bg-yellow-600 text-white cursor-pointer hover:bg-yellow-700' onClick={()=>editNote(note)}>Edit</button>
                        <button className='px-4 py-1 rounded bg-red-600 text-white cursor-pointer hover:bg-red-700' onClick={()=>deleteNote(note.id)}>Delete</button>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteTaking;
