import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import BackHistoryButton from "../common/backButton";
import { useAuth } from "../../hooks/useAuth";
import { useQualities } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";

const EditUserPage = () => {
  const { userId } = useParams();
  const { currentUser, updateUser } = useAuth();
  const history = useHistory();

  if (userId !== currentUser._id) {
    history.push(`/users/${currentUser._id}/edit`);
  }

  const { qualities, getQualities, isLoading: loadingQual } = useQualities();
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));
  const { professions, isLoading: loadingProf } = useProfession();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const isLoaded = !loadingQual && !loadingProf;

  useEffect(() => {
    if (isLoaded) {
      setData((prevState) => ({
        ...prevState,
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: currentUser.qualities.map((q) => {
          const newQ = getQualities(q);
          return { label: newQ.name, value: newQ._id };
        })
      }));
    }
  }, [isLoaded]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...currentUser,
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };

    try {
      await updateUser(newData);
      history.push(`/users/${currentUser._id}`);
    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

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
    }
  };

  const isValid = Object.keys(errors).length === 0;

  if (Object.keys(data).length !== 0) {
    return (
      <div className="container mt-3">
        <BackHistoryButton />
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
                options={professionsList}
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
                options={qualitiesList}
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
