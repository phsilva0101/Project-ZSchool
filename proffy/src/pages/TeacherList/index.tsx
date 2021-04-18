import React, { useState, FormEvent } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import TeacherItem,{ Teacher } from '../../components/TeacherItem'
import Input from '../../components/input'
import Select from '../../components/Select'
import { settings } from 'cluster'
import api from '../../services/api'



function TeacherList() {

    const [teachers,setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

  async  function searchTeacher(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis" >
                <form id="search-teachers" onSubmit={searchTeacher}>

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

                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
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
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit">
                        Buscar

                     </button>

                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {   
                return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
               


            </main>
        </div>
    )
}

export default TeacherList;