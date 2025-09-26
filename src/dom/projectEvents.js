export function setupProjectEvents(manager, renderCallback) {
  function handleDeleteProject(project) {
    const confirmed = confirm(
      `Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`
    );

    if (confirmed) {
      const success = manager.deleteProjectById(project.id);
      if (success) {
        renderCallback(manager.getCurrentProject());
      }
    }
  }

  function handleEditProject(project) {
    console.log('Edit project:', project.name);
  }

  return {
    handleDeleteProject,
    handleEditProject,
  };
}
