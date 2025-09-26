export function setupProjectEvents(manager, renderCallback) {
  function handleDeleteProject(project) {
    const confirmed = confirm(
      `Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`
    );

    if (confirmed) {
      const success = manager.deleteProjectById(project.id);
      if (success) {
        renderCallback();
      }
    }
  }

  function handleEditProject(project) {
    const newName = prompt('Enter the new project name:', project.name);
    if (newName && newName.trim() !== '' && newName !== project.name) {
      if (manager.projects[newName]) {
        alert(
          'A project with this name already exists. Please choose a different name.'
        );
        return;
      }

      delete manager.projects[project.name];
      project.name = newName;
      manager.projects[newName] = project;
      manager.save();

      renderCallback(project);
    }
  }

  return {
    handleDeleteProject,
    handleEditProject,
  };
}
