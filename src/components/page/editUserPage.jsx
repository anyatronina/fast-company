import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";

const EditUserPage = () => {
  const history = useHistory();
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      setUser(user);
    });

    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });

    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const newQualities = user.qualities.map((quality) => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
      }));

      setData((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: newQualities
      }));
    }
  }, [user]);

  useEffect(() => {
    validate();
  }, [data]);

  const getProfessionById = (id) => {
    for (const prof of Object.values(professions)) {
      if (prof._id === id) {
        return { _id: prof._id, name: prof.name };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of Object.values(elements)) {
      console.log(elem, "elem");
      for (const quality of Object.values(qualities)) {
        console.log(quality, "quality");
        if (elem.value === quality._id) {
          console.log(quality._id, "123");
          qualitiesArray.push({
            _id: quality._id,
            name: quality.name,
            color: quality.color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    console.log(data.qualities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    api.users.update(userId, {
      ...data,
      profession: getProfessionById(data.profession),
      qualities: getQualities(data.qualities)
    });

    console.log(
      {
        ...data,
        profession: getProfessionById(data.profession),
        qualities: getQualities(data.qualities)
      },
      "data"
    );

    history.push(`/users/${userId}`);
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите свою профессию"
      }
    }
  };

  const isValid = Object.keys(errors).length === 0;

  if (user) {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                defaultOption="Выберите..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                value={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <h6>Loading...</h6>;
};

// EditUserPage.propTypes = {
//   userId: PropTypes.string.isRequired
// };

export default EditUserPage;
