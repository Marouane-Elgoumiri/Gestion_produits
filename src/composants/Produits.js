import React, { useRef, useState } from 'react'
//import { useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

function Produits () {
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: 'oradinateur',
      prix: 7490,
      categorie: 'informatique'
    },
    {
      id: 2,
      nom: 'imprimante',
      prix: 1500,
      categorie: 'informatique'
    },
    {
      id: 3,
      nom: 'scanner',
      prix: 490,
      categorie: 'informatique'
    }
  ])
  const [nom, setNom] = useState('')
  const [prix, setPrix] = useState(0)
  const [categorie, setCategorie] = useState('')
  const [afficherForm, setafficherForm] = useState(false)
  const [modifierId, setModifierId] = useState(0);
  const nomRef=useRef();

  // const navigate = useNavigate();
  function handleDeleteProduct (produit) {
    const produitsCopy = produits.filter(prd => prd.id !== produit.id)
    setProduits(produitsCopy)
  }
  function initialiser () {
    setNom('')
    setPrix(0)
    setCategorie('')
    setafficherForm(false)
  }
  function handleSaveProduct (e) {
    e.preventDefault()
    // ajout
    if (nom !== '') {
      let id = new Date().getTime()
      let produit = { id, nom: nom, prix, categorie }
      setProduits([...produits, produit])
      setafficherForm(false)
    initialiser()
    }
    else
    {alert("veuillez saisir le nom de produit");
     nomRef.current.focus();}
       

    // modification
    if (modifierId !== 0) {
      const produit = produits.find(produit => produit.id === modifierId)
      //console.log(nouvelleVille);
      const produitsModifie = produits.map(prd =>
        prd.id === produit.id
          ? (prd = { id: prd.id, nom, prix, categorie })
          : {
              id: prd.id,
              nom: prd.nom,
              prix: prd.prix,
              categorie: prd.categorie
            }
      )
      // console.log(nouvelleVille);
      setProduits(produitsModifie);
      setModifierId(0);
      setafficherForm(false)
    initialiser()
    }

    
  }
  function handleEditProduct (produit) {
    const produitModifie = produits.find(prd => prd.id === produit.id)
    setNom(produitModifie.nom)
    setPrix(produitModifie.prix)
    setCategorie(produitModifie.categorie)
    setModifierId(produit.id)
    setafficherForm(1)
  }
  return (
    <div className='container m-5'>
      <div className='card m-2'>
        <div className='card-header'>
          <h2>Liste des Produits</h2>
        </div>
        <div className='m-2 ms-auto'>
          <button
            className='btn btn-outline-success'
            onClick={() => setafficherForm(true)}
          >
            Ajouter Produit...
          </button>
          <button
            className='m-2 btn btn-outline-danger'
            onClick={() => setafficherForm(false)}
          >
            X
          </button>
        </div>
        <div className='card-body'></div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Categorie</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {produits &&
              produits.map((pr) => (
                <tr>
                  <td>{pr.nom}</td>
                  <td>{pr.prix}</td>
                  <td>{pr.categorie}</td>
                  <td>
                    <button
                      className='btn btn-outline-success'
                      onClick={() => handleEditProduct(pr)}
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => handleDeleteProduct(pr)}
                    >
                      supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* formulaire Ajout et modification  */}
      {afficherForm && (
        <div className='card m-3'>
          <div className='card-body'>
            <form onSubmit={handleSaveProduct}>
              {' '}
              {/*si non il faut ecrire (e)=>handleSaveProduct(e)*/}
              <div className=' form-group mb-3'>
                <label className={'form-label'}>Nom : </label>
                <input
                  onChange={e => setNom(e.target.value)}
                  value={nom}
                  type='text'
                  className='form-control'
                  placeholder='nom..?'
                  ref={nomRef}
                />
              </div>
              <div form-group className='mb-3'>
                <label className='form-label'>Prix : </label>
                <input
                  onChange={e => setPrix(e.target.value)}
                  value={prix}
                  type='text'
                  className='form-control'
                  placeholder='Prix..?'
                />
              </div>
              <div className='form-group'>
                <label className={'form-label'}>Categorie : </label>
                <input
                  onChange={e => setCategorie(e.target.value)}
                  value={categorie}
                  type='text'
                  className='form-control'
                  placeholder='Categorie..?'
                />
              </div>
              <div className='form-group mt-3'>
                <button className='btn btn-success'>Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Produits
