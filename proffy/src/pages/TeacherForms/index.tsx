import React, { useState, FormEvent } from 'react'
import { useHistory} from 'react-router-dom'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import './styles.css'
import api from '../../services/api';


function TeacherForms() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsApp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')



  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 1, from: "", to: "" }
  ])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0, from: "", to: ""
      }
    ]);

  }

  function setScheduleItemsValue(position: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }

      }

      return scheduleItem;

    })
    setScheduleItems(updateScheduleItems)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')

    }).catch((err) => {
      console.log(err)
      alert('Erro no cadastro')
    })


  }
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição." />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => { setWhatsApp(e.target.value) }}
            />
            <TextArea
              name="bio"
              label="Biográfia"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
            />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Máteria"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Educação fisica', label: 'Educação fisica' },
                { value: 'Fisica', label: 'Fisica' },
                { value: 'Geográfia', label: 'Geográfia' },
                { value: 'Historia', label: 'Historia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' }


              ]}

            />

            <Input
              name="cost"
              label="Custo da sua hora por aula (em R$)"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />

          </fieldset>

          <fieldset>
            <legend>
              Horários disponiveis
             <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
             </button>
            </legend>


            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemsValue(index, "week_day", e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-Feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3 ', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sabado' },
                    ]}



                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemsValue(index, 'from', e.target.value)}

                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}

                    onChange={e => setScheduleItemsValue(index, 'to', e.target.value)}

                  />
                </div>

              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Alerta" />
            Importante! <br />
            Preencha todos os dados

          </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForms;